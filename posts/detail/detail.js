document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // 로그인된 사용자 정보 가져오기
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.profile && loggedInUser.profile.image) {
        const profileImage = document.getElementById('profileImage');
        profileImage.src = loggedInUser.profile.image;
    }

    if (postId) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = posts.find(post => post.id === parseInt(postId));
        if (post) {
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-date').textContent = post.date;
            document.getElementById('post-content').textContent = post.content;
            document.getElementById('post-likes').textContent = post.likes;
            document.getElementById('post-views').textContent = post.views;
            document.getElementById('post-comments').textContent = post.comments.length;

            if (post.image) {
                const postImage = document.getElementById('post-image');
                postImage.src = post.image;
                postImage.style.display = 'block';
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.id === post.writerId);
            if (user) {
                document.getElementById('post-author').textContent = user.profile.nickname;
                const authorImage = document.getElementById('post-author-image');
                authorImage.src = user.profile.image;
            } else {
                document.getElementById('post-author').textContent = '알 수 없음';
            }

            // 댓글 리스트 렌더링
            const commentList = document.getElementById('comment-list');
            commentList.innerHTML = '';

            post.comments.forEach(comment => {
                const commenter = users.find(u => u.id === comment.writerId);
                const commentCard = document.createElement('div');
                commentCard.className = 'comment-item';
                commentCard.innerHTML = `
                    <div class="comment-header">
                        <img src="${commenter && commenter.profile ? commenter.profile.image : '../../dummy/images/default_profile.png'}" alt="Profile Image" class="comment-author-image">
                        <span class="comment-author-name">
                            ${commenter && commenter.profile ? commenter.profile.nickname : '알 수 없음'}
                        </span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <div class="comment-body">
                        <p class="comment-content">${comment.content}</p>
                    </div>
                `;
                commentList.appendChild(commentCard);
            });
        }
    }
});
