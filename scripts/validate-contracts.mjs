import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const schemaPath = path.join(rootDir, "schemas", "contract.schema.json");
const dataPath = path.join(rootDir, "data", "contracts.json");

const [schemaText, contractsText] = await Promise.all([
  readFile(schemaPath, "utf8"),
  readFile(dataPath, "utf8"),
]);

const schema = JSON.parse(schemaText);
const contracts = JSON.parse(contractsText);

if (!Array.isArray(contracts)) {
  console.error("contracts.json must contain a top-level array.");
  process.exit(1);
}

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
});

addFormats(ajv);

const validateEntry = ajv.compile(schema);

const seenSlugs = new Set();
const seenNames = new Set();
const seenRepositories = new Set();
const errors = [];

for (const [index, contract] of contracts.entries()) {
  const isValid = validateEntry(contract);

  if (!isValid && validateEntry.errors) {
    for (const error of validateEntry.errors) {
      errors.push(
        `Entry ${index + 1} (${contract?.slug ?? "unknown"}): ${error.instancePath || "/"} ${error.message}`,
      );
    }
  }

  for (const [label, value, bucket] of [
    ["slug", contract.slug, seenSlugs],
    ["name", contract.name, seenNames],
    ["repositoryUrl", contract.repositoryUrl, seenRepositories],
  ]) {
    if (bucket.has(value)) {
      errors.push(`Duplicate ${label} detected: ${value}`);
    } else {
      bucket.add(value);
    }
  }
}

for (let index = 1; index < contracts.length; index += 1) {
  const previous = contracts[index - 1].name.toLowerCase();
  const current = contracts[index].name.toLowerCase();

  if (previous.localeCompare(current) > 0) {
    errors.push(
      `contracts.json should stay sorted by name. "${contracts[index - 1].name}" appears before "${contracts[index].name}".`,
    );
    break;
  }
}

if (errors.length > 0) {
  console.error("Registry data validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Validated ${contracts.length} contracts against schema, uniqueness checks, and sort order.`,
);
