let controlsHidden = false;

chrome.commands.onCommand.addListener((command) => {
  if (command === "hide") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const isYouTube = tab.url.includes("youtube.com/watch?") || tab.url.includes("youtu.be/watch?");

      if (isYouTube) {
        const scriptFile = controlsHidden ? 'src/show.js' : 'src/hide.js';
        console.log(`clearCUT - ${controlsHidden ? 'showing' : 'hiding'} the controls`);

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: [scriptFile]
        });

        controlsHidden = !controlsHidden;
      }
    });
  }
});