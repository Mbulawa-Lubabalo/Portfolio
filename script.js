console.log("asdf")

// Fetching the certificate data from the json file file

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);

/*----------------------------------- */
        const container = document.getElementById('certificates');
        const certs = data.certificates;

        for (const platform in certs) {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h3');
        title.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
        card.appendChild(title);

        const certData = certs[platform];
        if (typeof certData === 'object') {
            for (const cert in certData) {
            const link = document.createElement('a');
            link.href = certData[cert];
            link.target = '_blank';
            link.textContent = cert.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            card.appendChild(link);
            }
        } else {
            const link = document.createElement('a');
            link.href = certData;
            link.target = '_blank';
            link.textContent = 'View Certificate';
            card.appendChild(link);
        }

        container.appendChild(card);
        }
    })
    .catch(error => console.error("Error loading JSON file:", error));
