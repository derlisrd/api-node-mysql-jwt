import bcrypt from 'bcrypt'

export function compareAsync(password, toCompare) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, toCompare, function(err, res) {
            if (err) {
                 reject(err);
            } else {
                 resolve(res);
            }
        });
    });
}