/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('common');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
    /** @param {Creep} creep **/
    harvest_closest_energy: function(creep){
    let source = creep.pos.findClosestByPath(FIND_SOURCES);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ff0'}});
        }
    },
    
    /** @param {Creep} creep
        @param {String} id**/
    harvest_specific_energy: function(creep, id){
    let source = Game.getObjectById(id);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ff0'}});
        }
    },
    
    /** @param {Creep} creep **/
    store_energy: function(creep){
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity;
                }
            });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    },
    
    /** @param {Creep} creep **/
    build_closest: function(creep){
        let structure = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (creep.build(structure) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure, {visualizePathStyle: {stroke: '#f00'}});
        }
    },
    
     /** @param {Creep} creep **/
    repair_closest: function(creep){
        let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == 'constructedWall' && (structure.hits < structure.hitsMax);
                }
            });
        //console.log('Repair structure: ' + structure)
        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure, {visualizePathStyle: {stroke: '#f00'}});
        }
    },
    
    /** @param {Creep} creep **/
    upgrade_closest: function(creep){
        let controller = creep.room.controller;
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller, {visualizePathStyle: {stroke: '#00f'}});
        }
    }
};