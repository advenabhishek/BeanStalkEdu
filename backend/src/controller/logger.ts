import { open } from 'fs/promises'

export const parsefile = async (res: any, path: string) => {
    let file;
    try {
        file = await open(path);
    } catch (e) {
        return res.json({ success: false, message: 'unable to process your request' })
    }
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Content-Disposition', 'attachment; filename="test.txt')
    res.write('[')
    for await (const line of file.readLines()) {
        let text = await parseLine(line)
        res.write(text);
    }

    res.write(']')
    res.end()
};


const parseLine = (line: string) => {
    try {
        const stringsList = line.split(' - ')
        const data = JSON.parse(stringsList[2])
        const resultObj = {
            timestamp: new Date(stringsList[0]).getTime(),
            loglevel: stringsList[1],
            transactionId: data.transactionId,
            err: data.err,
            details: data.details,
        }
        return JSON.stringify(resultObj)
    } catch (e) {
        return ''
    }
}