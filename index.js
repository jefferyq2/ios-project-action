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
            const extractoOriginal = `
                <key>NSExceptionDomains</key>
                            <dict>
                                <key>localhost</key>
                                <dict>
                                    <key>NSExceptionAllowsInsecureHTTPLoads</key>
                                    <true/>
                                </dict>
                            </dict>
                `;

            const extractoNuevo = `
            <key>NSExceptionDomains</key>
                    <dict/>
            `;
            const regExpNSExceptionDomains = new RegExp(extractoOriginal.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'g');
            newData = newData.replace(regExpNSExceptionDomains, extractoNuevo);
        }
        fs.writeFile(infoPlistPath, newData, function (err) {
            if (err) throw err;
            console.log(`Successfully override CFBundle ${newCFBundle} on ${infoPlistPath}`);
            core.setOutput("result", `Done`);
        });
    });

} catch (error) {
    core.setFailed(error.message);
}
