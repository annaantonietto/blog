document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE CURTIDAS (LIKE / DISLIKE) ---
    const likeBtn = document.getElementById('like-btn');
    const dislikeBtn = document.getElementById('dislike-btn');
    const likeCountSpan = document.getElementById('like-count');
    const dislikeCountSpan = document.getElementById('dislike-count');

    let likes = parseInt(likeCountSpan.innerText);
    let dislikes = parseInt(dislikeCountSpan.innerText);
    
    let userState = null; // Pode ser 'liked', 'disliked' ou null

    likeBtn.addEventListener('click', () => {
        if (userState === 'liked') {
            // Se já curtiu, remove o clique
            likes--;
            userState = null;
            likeBtn.classList.remove('liked');
            likeBtn.querySelector('i').classList.replace('fa-solid', 'fa-regular');
        } else {
            // Se tinha descurtido antes, limpa o dislike primeiro
            if (userState === 'disliked') {
                dislikes--;
                dislikeBtn.classList.remove('disliked');
                dislikeBtn.querySelector('i').classList.replace('fa-solid', 'fa-regular');
            }
            likes++;
            userState = 'liked';
            likeBtn.classList.add('liked');
            likeBtn.querySelector('i').classList.replace('fa-regular', 'fa-solid');
        }
        updateCounts();
    });

    dislikeBtn.addEventListener('click', () => {
        if (userState === 'disliked') {
            // Se já descurtiu, remove o clique
            dislikes--;
            userState = null;
            dislikeBtn.classList.remove('disliked');
            dislikeBtn.querySelector('i').classList.replace('fa-solid', 'fa-regular');
        } else {
            // Se tinha curtido antes, limpa o like primeiro
            if (userState === 'liked') {
                likes--;
                likeBtn.classList.remove('liked');
                likeBtn.querySelector('i').classList.replace('fa-solid', 'fa-regular');
            }
            dislikes++;
            userState = 'disliked';
            dislikeBtn.classList.add('disliked');
            dislikeBtn.querySelector('i').classList.replace('fa-regular', 'fa-solid');
        }
        updateCounts();
    });

    function updateCounts() {
        likeCountSpan.innerText = likes;
        dislikeCountSpan.innerText = dislikes;
    }


    // --- LÓGICA DE COMENTÁRIOS ---
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que a página recarregue

        const nameInput = document.getElementById('comment-name');
        const textInput = document.getElementById('comment-text');

        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (name && text) {
            // Cria a estrutura do novo comentário
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            commentDiv.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${escapeHTML(name)}</span>
                    <span class="comment-date">Agora mesmo</span>
                </div>
                <p class="comment-body">${escapeHTML(text)}</p>
            `;

            // Adiciona o comentário no topo da lista
            commentsList.insertBefore(commentDiv, commentsList.firstChild);

            // Limpa o formulário
            nameInput.value = '';
            textInput.value = '';
        }
    });

    // Função de segurança básica para evitar injeção de código (XSS) nos comentários
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});
