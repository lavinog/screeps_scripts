var common = require('common');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('🔄 harvest');
        }
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('🚧 upgrading');
        }
        
        if(creep.memory.harvesting) {
            common.harvest_specific_energy(creep, '57ef9d3686f108ae6e60d6d2');
            //common.harvest_closest_energy(creep);
        }
        else {
            common.upgrade_closest(creep);
        }
    }
};

module.exports = roleUpgrader;