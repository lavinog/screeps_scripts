var stdharvester = require('role.stdHarvester');
var stdbuilder = require('role.stdBuilder');
var stdupgrader = require('role.stdUpgrader');
var stdfixer = require('role.stdFixer');
var _ = require('lodash');

module.exports.loop = function () {
   
  population_control();
  update_creeps();
};

function get_num_workers_by_type(type) {
    return _.sum(Game.creeps, (c) => c.memory.type == type);
}

function update_creeps(){
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.type == 'harvester') {
            stdharvester.run(creep);
        } else if (creep.memory.type == 'upgrader') {
            stdupgrader.run(creep);
        } else if (creep.memory.type == 'builder') {
            stdbuilder.run(creep);
        } else if (creep.memory.type == 'fixer') {
            stdfixer.run(creep);
        }
    }

}


function population_control(){
    let maxHarvester = 4;
    let minHarvester = 1;
    let maxUpgrader = 3;
    let maxBuilder = 0;
    let maxFixer = 1;

    let numHarvester = get_num_workers_by_type('harvester');
    let numUpgrader = get_num_workers_by_type('upgrader');
    let numBuilder = get_num_workers_by_type('builder');
    let numFixer = get_num_workers_by_type('fixer');


    //console.log('Number of harvesters: ' + numHarvester);
    //console.log('Number of upgraders: ' + numUpgrader);
    //console.log('Number of builders: ' + numBuilder);


    //console.log('Max number of harvesters:' + maxHarvester);
    //console.log('Max number of upgraders: ' + maxUpgrader);
    //console.log('Max number of upgraders: ' + maxBuilder);
    // Cleanup memory of decayed creeps
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    // Maintains creep population according to predefined values
    if (Game.spawns.Sprawn1.energy >= 100) {
        if (numHarvester <= minHarvester) {
            let spawn_name = Game.spawns.Sprawn1.createCreep([WORK, CARRY, MOVE], undefined, {'harvesting': true, 'type': 'harvester'});
            console.log('Spawning Harvester: ' + spawn_name)
        } else if (numHarvester < maxHarvester) {
            let spawn_name = Game.spawns.Sprawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE], undefined, {'harvesting': true, 'type': 'harvester'});
            console.log('Spawning Harvester: ' + spawn_name)
        } else if (numUpgrader < maxUpgrader) {
            let spawn_name = Game.spawns.Sprawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE], undefined, {'harvesting': true, 'type': 'upgrader'});
            console.log('Spawning Upgrader: ' + spawn_name)
        } else if (numBuilder < maxBuilder) {
            let spawn_name = Game.spawns.Sprawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE], undefined, {'harvesting': true, 'type': 'builder'});
            console.log('Spawning Builder: ' + spawn_name)
        } else if (numFixer < maxFixer) {
            let spawn_name = Game.spawns.Sprawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE], undefined, {'harvesting': true, 'type': 'fixer'});
            console.log('Spawning Fixer: ' + spawn_name)
        }
    }

}


