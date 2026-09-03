export function toggleSinglePlayer(singleplayer) {
    if (singleplayer) {
        singleplayer = false;

        document.getElementById('selection_singleplayer').style.display = 'none';
        document.getElementById('selection_multiplayer').style.display = 'inline-block';
        
        let selectionSingle = document.getElementById('SelectionSingle');
        let selectionMultiplayer = document.getElementById('SelectionMultiplayer');

        selectionSingle.style.color = "#333";
        selectionSingle.style.backgroundColor = "white";

        selectionMultiplayer.style.color = "white";
        selectionMultiplayer.style.backgroundColor = "#333";

        return singleplayer;
    } else {
        singleplayer = true;

        document.getElementById('selection_singleplayer').style.display = 'inline-block';
        document.getElementById('selection_multiplayer').style.display = 'none';
        
        let selectionSingle = document.getElementById('SelectionSingle');
        let selectionMultiplayer = document.getElementById('SelectionMultiplayer');

        selectionSingle.style.color = "white";
        selectionSingle.style.backgroundColor = "#333";

        selectionMultiplayer.style.color = "#333";
        selectionMultiplayer.style.backgroundColor = "white";

        return singleplayer;
    }
}