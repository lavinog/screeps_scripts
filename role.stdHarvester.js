var common = require('common');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('🔄 harvest');
        }
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('🚧 store');
        }
        
        if(creep.memory.harvesting) {
            common.harvest_closest_energy(creep);
        }
        else {
            common.store_energy(creep);
        }
    }
};

module.exports = roleHarvester;