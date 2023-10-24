module.exports = async function solution({ urls, fetcher, maximumRetryCount }) {
    const successfulUrls = []

    const processUrl = async url => {
        let retryCount = 0

        while (retryCount < maximumRetryCount) {
            try {
                const result = await fetcher(url)
                successfulUrls.push(result)
                break
            } catch (err) {
                retryCount++
                if (retryCount > maximumRetryCount) break
            }

            await new Promise(resolve => setTimeout(resolve, 100))
        }
    }

    const maxConcurrentRequests = 10
    const batchPromises = []

    for (let i = 0; i < urls.length; i += maxConcurrentRequests) {
        const batch = urls.slice(i, i + maxConcurrentRequests)
        const batchPromises = batch.map(url => processUrl(url))
        await Promise.all(batchPromises)
    }

    return successfulUrls
}