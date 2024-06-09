const PASTEBIN_PASTE_URL = "http://pastebin.com/raw/mjdzBXV8";


async function getVoteSiteLinks()
{
    const response = await fetch(PASTEBIN_PASTE_URL, { mode: "cors" });

    const text = await response.text();

    const voteSites = text.split("\n");
    return voteSites.map(link => link.replace(/(\r\n|\n|\r)/gm, ""));
}


chrome.action.onClicked.addListener(async activeTab =>
{
    try
    {
        const voteSites = await getVoteSiteLinks();

        for (const [i, url] of voteSites.entries())
        {
            if (i === 0)
            {
                await chrome.windows.create({ url: url });
                continue;
            }

            await chrome.tabs.create({ url: url, active: true });
        }
    }
    catch (err)
    {
        console.error(err);

        await chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: ["content.js"]
        });
    }
});