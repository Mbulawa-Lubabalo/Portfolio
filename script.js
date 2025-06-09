console.log("asdf")

// Fetching the certificate data from the json file file

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const container = document.querySelector('.certificates');

        const projectsSection = document.querySelector('.projects');
        const contactSection = document.querySelector('.contactDetails');
    

/**-------Projects-------------------------------- */
        const projects = data.projects;

        projectsSection.innerHTML = '<h2>Projects</h2>';

        projects.forEach((projectUrl, index) => {
            const link = document.createElement('a');
            link.href = projectUrl;
            link.target = '_blank';
            link.textContent = `Project ${index + 1}`;
            link.style.display = 'block'; // so links appear on separate lines
            projectsSection.appendChild(link);
        });



/*-------Certificates---------------------------- */
        

        const certs = data.certificates;
        const contact = data.contactDetails;

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

        // Contact Details
        contactSection.innerHTML = '<h2>Contact Details</h2>';

        for (const key in contact) {
            const para = document.createElement('p');

            const formattedKey = key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

            if (key.includes("email")) {
                para.innerHTML = `<strong>${formattedKey}:</strong> <a href="mailto:${contact[key]}">${contact[key]}</a>`;
            } else {
                para.innerHTML = `<strong>${formattedKey}:</strong> ${contact[key]}`;
            }

            contactSection.appendChild(para);
        }

    })
    .catch(error => console.error("Error loading JSON file:", error));
