
const COMMAND_REGEXP = /^\!w+$/;


export function commandHandler() {
    this.availableCommands = {
        "!tables": this.onTables,
        "!exit": this.onExit
    }
}

commandHandler.prototype.onTables = function commandHandlerOnTables() {
}

commandHandler.prototype.onExit = function commandHandlerOnExit() {
    
}
commandHandler.prototype.onError = function commandHandlerOnError(command) {
    throw new Error("No command " + command + " exists");
}
commandHandler.prototype.handle = function commandHandlerHandle(command: string) {
    if (!command.match(COMMAND_REGEXP)) return null;
    return this.availableCommands[command] == null ? 
        this.onError(command) : this.availableCommands[command]();
}
