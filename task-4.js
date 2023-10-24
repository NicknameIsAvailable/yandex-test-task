module.exports = function solution(N, M, s, t, trails) {
    const graph = new Array(N + 1).fill().map(() => [])

    for (let i = 0; i < M; i++) {
        const [u, v] = trails[i]
        if (u >= 1 && u <= N && v >= 1 && v <= N) {
            graph[u].push(v)
        }
    }

    const dfs = (node, target, path) => {
        path.push(node)

        if (node === target) {
            return path
        }

        if (Array.isArray(graph[node])) {
            for (const neighbor of graph[node]) {
                if (path.indexOf(neighbor) === -1) {
                    const newPath = dfs(neighbor, target, [...path])
                    if (newPath) {
                        return newPath
                    }
                }
            }
        }

        return null
    }

    const romaPath = dfs(s, t, [])

    if (!romaPath) {
        return false
    }

    for (let i = 0; i < romaPath.length - 1; i++) {
        const u = romaPath[i]
        const v = romaPath[i + 1]
        if (Array.isArray(graph[u])) {
            graph[u] = graph[u].filter(neighbor => neighbor !== v)
        }
    }
    const dimaPath = dfs(s, t, [])
    if (!dimaPath) {
        return false
    }
    return [romaPath, dimaPath]
}