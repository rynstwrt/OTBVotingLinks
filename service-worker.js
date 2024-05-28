try
{
    importScripts("votesites.js");


    chrome.action.onClicked.addListener(activeTab =>
    {
        for (const [i, url] of VOTE_SITES.entries())
        {
            if (i === 0)
            {
                chrome.windows.create({ url: url });
                continue;
            }

            chrome.tabs.create({ url: url, active: true });
        }
    });
}
catch (err)
{
    console.error(err);
}



