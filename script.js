document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll animation effect
    const featureCards = document.querySelectorAll('.feature-card');
    
    // 使用IntersectionObserver为特性卡片添加渐入效果
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 设置延迟，使卡片按顺序出现
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // 初始化卡片样式并添加到观察者
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });

    // 为标题添加淡入效果
    const title = document.querySelector('.site-title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    }

    // 为应用标题添加淡入效果
    const appTitle = document.querySelector('.application-title');
    if (appTitle) {
        appTitle.style.opacity = '0';
        appTitle.style.transform = 'scale(0.95)';
        appTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            appTitle.style.opacity = '1';
            appTitle.style.transform = 'scale(1)';
        }, 500);
    }

    // 为链接添加悬停效果
    const links = document.querySelectorAll('.feature-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'transform 0.3s ease';
            link.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });

    // GitHub button click tracking
    const githubBtn = document.querySelector('.action-buttons a:first-child');
    if (githubBtn) {
        githubBtn.addEventListener('click', () => {
            console.log('GitHub button clicked');
            // Add your tracking code here
        });
    }

    // Dynamic year update
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}); 