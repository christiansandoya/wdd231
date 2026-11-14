document.addEventListener('DOMContentLoaded', () => {
    const spotlightContainer = document.getElementById('spotlight-container');
    if (!spotlightContainer) return;

    const getSpotlights = async () => {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error('Failed to load members data');
            
            const members = await response.json();
            
            const qualifiedMembers = members.filter(member => 
                member.membershipLevel === 2 || member.membershipLevel === 3 || 
                member.membershipLevel === 'Silver' || member.membershipLevel === 'Gold'
            );

            const randomSpotlights = getRandomMembers(qualifiedMembers, 3);
            displaySpotlights(randomSpotlights);

        } catch (error) {
            console.error('Error loading spotlights:', error);
            spotlightContainer.innerHTML = '<p>Failed to load company spotlights.</p>';
        }
    };

    function getRandomMembers(arr, count) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function displaySpotlights(members) {
        spotlightContainer.innerHTML = '';
        members.forEach(member => {
            const card = document.createElement('section');
            card.classList.add('member-card');

            let levelText = '';
            let levelClass = '';
            if (member.membershipLevel === 3 || member.membershipLevel === 'Gold') {
                levelText = 'Gold Member';
                levelClass = 'gold';
            } else if (member.membershipLevel === 2 || member.membershipLevel === 'Silver') {
                levelText = 'Silver Member';
                levelClass = 'silver';
            } else {
                levelText = 'Non-Profit / Member';
                levelClass = 'member';
            }

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo/photo" width="100" height="100" loading="lazy">
                <div class="member-info">
                    <h2>${member.name}</h2>
                    <p class="tagline">"${member.tagline}"</p>
                    <p class="address">Address: ${member.address}</p>
                    <p class="phone">Phone: ${member.phone}</p>
                    <p class="membership ${levelClass}">Membership: ${levelText}</p>
                    <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="website-link">Visit Website</a>
                </div>
            `;
            spotlightContainer.appendChild(card);
        });
    }

    getSpotlights();
});