const core = require('@actions/core');
const fs = require('fs');

try {
    const infoPlistPath = core.getInput('infoPlistPath');
    const newCFBundle = core.getInput('newCFBundleURLSchemes');
    const oldCFBundle = core.getInput('oldCFBundleURLSchemes');
    const cleanNSExceptionDomains = core.getInput('cleanNSExceptionDomains') === 'true' ? true : false;
    console.log(`newCFBundle: ${newCFBundle}`);
    console.log(`oldCFBundle: ${oldCFBundle}`);
    console.log(`infoPlistPath: ${infoPlistPath}`);
    console.log(`cleanNSExceptionDomains: ${cleanNSExceptionDomains}`);

    fs.readFile(infoPlistPath, 'utf8', function (err, data) {
        console.log(`Processing ${infoPlistPath}`);
        const regExpCFBundle = new RegExp(oldCFBundle, 'g');
        let newData = data.replace(regExpCFBundle, newCFBundle);
        if (cleanNSExceptionDomains) {
            const regExpNSExceptionDomains = new RegExp(`<key>NSExceptionDomains<\\/key>(.|\\n)*?<\\/dict>`, 'g');
            const regExpExe = regExpNSExceptionDomains.exec(newData);
            // Check if NSExceptionDomains is present and is not already empty
            if (regExpExe.length > 0) {
                if(regExpExe[0].length > 42){
                    console.log(`Found NSExceptionDomains: ${regExpExe[0]}`);
                    newData = newData.replace(regExpNSExceptionDomains, '<key>NSExceptionDomains</key>');
                }
            }
        }
        fs.writeFile(infoPlistPath, newData, function (err) {
            if (err) throw err;
            console.log(`Successfully override CFBundle ${newCFBundle} on ${path}`);
            core.setOutput("result", `Done`);
        });
    });

} catch (error) {
    core.setFailed(error.message);
}
