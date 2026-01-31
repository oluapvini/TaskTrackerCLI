export function help() {
    console.log(`
        Task Tracker CLI

        Usage:
        node src/index.js <command> [arguments]

        Commands:
        add "<description>"
        list [todo|in-progress|done]
        update <id> "<description>"
        delete <id>
        mark-in-progress <id>
        mark-done <id>

        Examples:
        node src/index.js add "Buy milk"
        node src/index.js list
        node src/index.js list done
        node src/index.js update 3 "Buy milk and eggs"
        node src/index.js mark-in-progress 3
        node src/index.js mark-done 3
        node src/index.js delete 3
    `);
}