import * as allCommands from '../export.js';
import { config } from '../../index.js';

var commandInfo = {
    cancelMessage: true,
    description: 'Get list of all the commands available or input an argument to get information about that specific command',
    usage: [
        'help',
        'help [command name]'
    ]
};
/**
 * Explanation of the parameters that are being passed in the 'execute' function
 * @param {Object} chatmsg This is the object that is passed by the event listening for messages being sent in chat
 * @param {Array} args This collectes all the message that comes after the prefix and the command name in a array, which is split by an 'space'
 * @param {Module} Minecraft This is the module Minecraft, which holds all the important classes. More information at: https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/minecraft
 */
function execute(chatmsg, args, Minecraft) {
    const prefix = config.commandPrefix;
    if(!args[0]) return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"I have added a Rainbow Text in chat and Custom Commands.\nTo give your text Rainbow Effect in chat give yourself the tag 'rainbowText' (/tag @s add rainbowText)\n\nCustom Command prefix is: §a${prefix}§f\nHere are all the custom commands available...\n§aeval, help, location, home, ping\n§eType §a${prefix}help §b[command name]§e for more information on the command!\n\n§eThis pack was created by notbeer!\n§9Discord: §fnotbeer#9204\n§aXbox Live: §fColoringEmy86"}]}`);
    let cmdList = allCommands[args[0]];
    if(!cmdList) return Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§cThat's not a valid command!"}]}`);
    cmdList = cmdList.commandInfo;
    Minecraft.Commands.run(`tellraw "${chatmsg.sender.name}" {"rawtext":[{"text":"§eCommand: §a${prefix}§f${args[0]}\n§eDescription: §f${cmdList.description}\n§aUsage: \n§a${prefix}§f${cmdList.usage.join(`\n§a${prefix}§f`)}"}]}`);
};

export { commandInfo, execute };