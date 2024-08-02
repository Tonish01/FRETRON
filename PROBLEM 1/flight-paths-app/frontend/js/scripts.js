document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('flightCanvas');
    const ctx = canvas.getContext('2d');
    const form = document.getElementById('flightForm');

    const scale = 100; // Scale factor for coordinates

    // Fetch flight data from the backend
    fetch('http://localhost:5000/api/flights')
        .then(response => response.json())
        .then(flights => {
            flights.forEach(flight => {
                drawFlightPath(flight);
            });
        })
        .catch(error => console.error('Error fetching flight data:', error));

    /**
     * Draws a flight path on the canvas.
     * @param {Object} flight - Flight object containing path and color.
     */
    function drawFlightPath(flight) {
        ctx.beginPath();
        ctx.moveTo(flight.path[0].x * scale, flight.path[0].y * scale);

        flight.path.forEach(point => {
            ctx.lineTo(point.x * scale, point.y * scale);
        });

        ctx.strokeStyle = flight.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        flight.path.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x * scale, point.y * scale, 5, 0, 2 * Math.PI);
            ctx.fillStyle = flight.color;
            ctx.fill();
            ctx.closePath();
        });
    }

    // Handle form submission to add a new flight
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const color = document.getElementById('color').value;
        const pathString = document.getElementById('path').value;

        const path = pathString.split(' ').map(coord => {
            const [x, y] = coord.split(',').map(Number);
            return { x, y };
        });

        const flight = { name, path, color };

        fetch('http://localhost:5000/api/flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flight),
        })
        .then(response => response.json())
        .then(newFlight => {
            drawFlightPath(newFlight);
            form.reset();
        })
        .catch(error => console.error('Error adding new flight:', error));
    });
});
