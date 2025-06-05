const https = require('https');
const fs = require('fs');
const path = require('path');

const allLogos = {
    'facebook': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png', directory: 'social' },
    'twitter': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png', directory: 'social' },
    'instagram': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png', directory: 'social' },
    'linkedin': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png', directory: 'social' },
    'github': { url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png', directory: 'social' },
    'javascript': { url: 'https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg', directory: 'tech' },
    'react': { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', directory: 'tech' },
    'html5': { url: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg', directory: 'tech' },
    'css3': { url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg', directory: 'tech' },
    'mongodb': { url: 'https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg', directory: 'tech' },
    'firebase': { url: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg', directory: 'tech' },
    'nodejs': { url: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg', directory: 'tech' },
    'canva': { url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/canva-icon.svg', directory: 'tech' },
    'capcut': { url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Capcut-logo.svg', directory: 'tech' },
    'wordpress': { url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Wordpress-Logo.svg', directory: 'tech' },
    'gmail': { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_(2020).svg', directory: 'social' },
    'tailwind': { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', directory: 'tech' },
    'php': { url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg', directory: 'tech' }
};

// Comment out the techLogos array as it's not used in the current download logic
/*
const techLogos = [
    { name: 'javascript', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg' },
    { name: 'react', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
    { name: 'html5', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg' },
    { name: 'css3', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg' },
    { name: 'mongodb', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg' },
    { name: 'firebase', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-original.svg' },
    { name: 'nodejs', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg' },
    { name: 'canva', url: 'https://svgdownload.files.wordpress.com/2022/09/canva-1.svg' },
    { name: 'capcut', url: 'https://seeklogo.com/images/C/capcut-logo-9CD9A29F74-seeklogo.com.png' },
    { name: 'wordpress', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-original.svg' },
    // New logos for Fish Monitoring project
    { name: 'vuejs', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg' },
    { name: 'python', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
    { name: 'django', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-original.svg' },
    { name: 'postgresql', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg' },
    { name: 'chartjs', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/chartjs/chartjs-original.svg' },
    { name: 'tailwind', url: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
];
*/

const downloadImage = (url, filename, directory) => {
    return new Promise((resolve, reject) => {
        const targetDir = path.join(__dirname, 'images', directory);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        const filePath = path.join(targetDir, filename);
        const fileStream = fs.createWriteStream(filePath);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    console.log(`Downloaded ${filename} to images/${directory}`);
                    resolve();
                });
            } else {
                reject(`Failed to download ${filename}: ${response.statusCode}`);
            }
        }).on('error', (err) => {
            reject(`Error downloading ${filename}: ${err.message}`);
        });
    });
};

// Download all logos
Promise.all(
    Object.entries(allLogos).map(([name, data]) => 
        downloadImage(data.url, `${name}${path.extname(data.url)}`, data.directory)
    )
).then(() => {
    console.log('All logos downloaded successfully!');
}).catch((error) => {
    console.error('Error downloading logos:', error);
}); 