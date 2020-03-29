// bfilter.js - Bloom Filter functions
//
// todo: calculate m and k from requirements 

const m = 1000000;  // todo: calculate this 
const k = 4;        // Number of hashes to use, todo: calculate

var blist = [];     // todo: instead of a var, call an api on a server to add to a database
var filter = [];    // Since I have lots more RAM than Mr. Bloom, I'll use it rather than fool with bits
// JavaScript arrays have a limit of about 4.29 billion elements

var murmur = require("murmurhash-js")

// Hardcode a list of numbers rather than generating them to improve the hash distribution 
// todo: test to see if this actually matters
const seeds = [78557, 691, 2, 163, 65537, 1729, 28, 26, 1337];

module.exports = {
    AddToFilter: function(item) {
        blist.push(item);     // todo: make this a database write
        
        for (var i = 0; i < k; i++) // calc hashes
        { 
            const index = murmur.murmur3(item, seeds[i]) % m;

            if (typeof filter[index] == 'undefined')
                filter[index] = 0;  // can't increment undefined

            filter[index]++;     // Update filter; Use a ref count so we can implement removal
        }

        return true;
    },
    IsInSet: function(item) {
        for (var i = 0; i < k; i++)
        { 
            const index = murmur.murmur3(item, seeds[i]) % m;  

            if (typeof filter[index] == 'undefined')  
                return false; // If any don't match, we are done
        }

        return true;
    },
    RemoveFromFilter: function(item) {
        if (!this.IsInSet(item))
            return false; // not in set, might as well use the filter since we have it

        // We have to do the expensive search in case there is a hash collision,
        // that would mean the 'not in set' guarantee would be broken
        // todo: make this a call to the (more efficient) database
        const blistindex = blist.indexOf(item);  

        if (blistindex > -1) {
            blist.splice(blistindex, 1);

            for (var i = 0; i < k; i++)
            {         
                const index = murmur.murmur3(item, seeds[i]) % m;

                filter[index]--;    // Update the filter by decrementing the ref count
                                    // Note we are sure these were previously set, though 
                                    // testing for undefined isn't a bad idea

                if (filter[index] <= 0) 
                    filter[index] = undefined; // This way may let the system manage memory better than if we left a 0
            }   
            return true;
        }
        else
            return false; // turned out not to be in set
    },
}