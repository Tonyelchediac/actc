// Sample images for each line card
const lineImages = [
    [
        '../route-images/B1.jpg',
        '../route-images/B2.jpg',
        '../route-images/B3.jpg',
        '../route-images/B4.jpg',
        '../route-images/B5.jpg',
        '../route-images/B6.jpg',
        '../route-images/B7.jpg'
    ],
    [
        '../route-images/ML1.jpg',
        '../route-images/ML2.jpg',
        '../route-images/ML3.jpg',
        '../route-images/ML4.jpg'
    ]
];

const currentIndexes = [0, 0];

// Get all line cards
document.querySelectorAll('.line-card').forEach((card, idx) => {
    const imagesDiv = card.querySelector('.images');
    const prevBtn = card.querySelector('.prev-btn');
    const nextBtn = card.querySelector('.next-btn');

    function showImage() {
        imagesDiv.innerHTML = `<img src="${lineImages[idx][currentIndexes[idx]]}" alt="Line Image" style="width:100%;">`;
    }
    showImage();

    prevBtn.onclick = () => {
        currentIndexes[idx] = (currentIndexes[idx] - 1 + lineImages[idx].length) % lineImages[idx].length;
        showImage();
    };
    nextBtn.onclick = () => {
        currentIndexes[idx] = (currentIndexes[idx] + 1) % lineImages[idx].length;
        showImage();
    };
});