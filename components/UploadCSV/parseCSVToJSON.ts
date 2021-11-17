import { parse } from "csv-parse"

// https://csv.js.org/parse

export default async function parseCSVToJSON(
  file: File
): Promise<{ data?: string[][]; error?: Error }> {
  try {
    const buffer = await file.text()

    const parser = parse(buffer, {
      delimiter: ";",
      fromLine: 15,
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
