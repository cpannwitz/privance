import { parse } from "csv-parse"
import { ParsedCSVValues } from "../../types/types"

// https://csv.js.org/parse

export default async function parseCSVToJSON(
  file: File
): Promise<{ data?: ParsedCSVValues[]; error?: Error }> {
  try {
    const buffer = await file.text()

    const parser = parse(buffer, {
      delimiter: ";",
      skipEmptyLines: true,
      skipRecordsWithError: true,
      relax_column_count_more: true,
      columns: [
        "issuedate",
        "__",
        "issuer",
        "type",
        "purpose",
        "balance",
        "__",
        "amount",
        "currency",
      ],
    })
    const records = []

    for await (const record of parser) {
      records.push(record)
    }
    return { data: records }
  } catch (error) {
    return { error: error as Error }
  }
}
