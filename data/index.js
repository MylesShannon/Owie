function connect() {
    const socket = new WebSocket(`ws://${window.location.hostname}/socket`);
    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        document.getElementById("voltage").innerText = data?.voltage ? `${data.voltage} volts` : 'N/A';
        document.getElementById("amperage").innerText = data?.amperage ? `${data.amperage} amps` : 'N/A';
        document.getElementById("soc").innerText = data?.soc ? `${data.soc}%` : 'N/A';
        document.getElementById("overriddenSoc").innerText = data?.overriddenSoc ? `${data.overriddenSoc}%` : 'N/A';
        document.getElementById("usedCharge").innerText = data?.usedCharge ? `${data.usedCharge} mAh` : 'N/A';
        document.getElementById("regenCharge").innerText = data?.regenCharge ? `${data.regenCharge} mAh` : 'N/A';
        document.getElementById("uptime").innerText = data?.uptime ? data.uptime : 'N/A';
        if (data?.cells) {
            document.getElementById("cells").innerHTML = '';
            for (var i = 0; i < 3; i++) {
                const row = document.createElement('tr');
                for (var j = 0; j < 5; j++) {
                    const cell = document.createElement('td');
                    cell.innerText = data.cells[i + j] ? data.cells[i + j] : 'N/A';
                    row.appendChild(cell);
                }
                document.getElementById("cells").appendChild(row);
            }
        }
    };
}

window.setTimeout(connect, 0);