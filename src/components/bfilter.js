// bfilter.js - Bloom Filter functions
//
// todo: calculate m and k from defined requirements
// todo: add unit tests

const db = require('./db'); // Our database interface to the full data set

const m = 1000000;  // todo: calculate this
const k = 4;        // Number of hashes to use, todo: calculate

var filter = [];    // Modern computers have lots of RAM and speed compared to Mr. Bloom's, we'll use it
                    // Note that even just 4 bits should be plenty to implement the ref count
// JavaScript arrays have a limit of about 4.29 billion elements

var murmur = require("murmurhash-js")

// Hardcode a list of unrelated numbers rather than generating them to improve the hash distribution 
// todo: test to see if this actually matters
const seeds = [78557, 691, 2, 163, 65537, 1729, 28, 26, 1337, 427];

module.exports = {
    AddToFilter: function(item) {
        db.push(item);     // Pretend db is a real database API
        
        for (var i = 0; i < k; i++) // calc hashes
        { 
            const index = murmur.murmur3(item, seeds[i]) % m;

            if (typeof filter[index] == 'undefined')
                filter[index] = 0;  // can't increment undefined

            filter[index]++;     // Update filter; use a ref count so we can implement removal
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

        // We ask the database for the unfiltered truth because in case there 
        // was a hash collision in the filter, the 'not in set' guarantee would be broken
        const dbindex = db.indexOf(item);

        if (dbindex > -1) { // The database has confirmed it really is in the set
            db.splice(dbindex, 1);

            for (var i = 0; i < k; i++)
            {         
                const index = murmur.murmur3(item, seeds[i]) % m;

                filter[index]--;    // Update the filter by decrementing the ref count
                                    // Note we are sure these were previously set, though 
                                    // testing for undefined isn't a bad idea

                if (filter[index] <= 0) 
                    filter[index] = undefined; // This may let the system manage memory better than if we left a 0
            }   
            return true;
        }
        else
            return false; // Turned out not to be in set, filter had returned a false positive
    },
}