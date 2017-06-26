var common = require('common');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('🔄 harvest');
        }
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('🚧 repair');
        }

        if(creep.memory.harvesting) {
            common.harvest_closest_energy(creep);
        }
        else {
            common.repair_closest(creep);
        }
    }
};

module.exports = roleBuilder;