document.addEventListener('DOMContentLoaded', () => {
    // 1. Footer Dynamic Dates (Year & Last Modified)
    const currentYearSpan = document.getElementById('currentyear');
    const lastModifiedParagraph = document.getElementById('lastModified');

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
    }

    const menuButton = document.getElementById('menu-button');
    const navigation = document.getElementById('navigation');

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            menuButton.classList.toggle('open');
        });
    }

    const membersContainer = document.getElementById('members-container');

    if (membersContainer) {
        const jsonURL = 'data/members.json';

        const getMembers = async () => {
            try {
                const response = await fetch(jsonURL);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                displayMembers(data);
            } catch (error) {
                console.error('Error fetching members data:', error);
                membersContainer.innerHTML = '<p class="error-msg">Failed to load member data. Please try again later.</p>';
            }
        };

        const displayMembers = (members) => {
            membersContainer.innerHTML = ''; // Clear container

            members.forEach(member => {
                const card = document.createElement('section');
                card.classList.add('member-card');

                // Format membership level text & badge class
                let levelText = '';
                let levelClass = '';
                if (member.membershipLevel === 3) {
                    levelText = 'Gold Member';
                    levelClass = 'gold';
                } else if (member.membershipLevel === 2) {
                    levelText = 'Silver Member';
                    levelClass = 'silver';
                } else {
                    levelText = 'Non-Profit / Member';
                    levelClass = 'member';
                }

                card.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name} logo/photo" loading="lazy">
                    <div class="member-info">
                        <h3>${member.name}</h3>
                        <p class="tagline">"${member.tagline}"</p>
                        <p class="address">Adress: ${member.address}</p>
                        <p class="phone">Phone:${member.phone}</p>
                        <p class="membership ${levelClass}">Membership: ${levelText}</p>
                        <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="website-link">Visit Website</a>
                    </div>
                `;

                membersContainer.appendChild(card);
            });
        };

        getMembers();

        // 4. Grid / List View Toggle Logic
        const gridButton = document.getElementById('grid');
        const listButton = document.getElementById('list');

        if (gridButton && listButton) {
            gridButton.addEventListener('click', () => {
                membersContainer.classList.add('grid');
                membersContainer.classList.remove('list');
                gridButton.classList.add('active');
                listButton.classList.remove('active');
            });

            listButton.addEventListener('click', () => {
                membersContainer.classList.add('list');
                membersContainer.classList.remove('grid');
                listButton.classList.add('active');
                gridButton.classList.remove('active');
            });
        }
    }
});