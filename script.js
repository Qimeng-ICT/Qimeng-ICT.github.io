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

    // CodeV downloads counter
    const downloadUrls = [
        'https://huggingface.co/api/models/yang-z/CodeV-CL-7B?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/yang-z/CodeV-DS-6.7B?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/yang-z/CodeV-QW-7B?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/yang-z/CodeV-QC-7B?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/yang-z/CodeV-All-CL?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/yang-z/CodeV-All-DSC?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/yang-z/CodeV-All-CQ?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/yang-z/CodeV-All-QC?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/mradermacher/CodeV-DS-6.7B-GGUF?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/mradermacher/CodeV-CL-7B-GGUF?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/RichardErkhov/yang-z_-_CodeV-CL-7B-gguf?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/RichardErkhov/yang-z_-_CodeV-DS-6.7B-gguf?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/tensorblock/CodeV-CL-7B-GGUF?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/RichardErkhov/yang-z_-_CodeV-DS-6.7B-8bits?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/RichardErkhov/yang-z_-_CodeV-QW-7B-4bits?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/RichardErkhov/yang-z_-_CodeV-QW-7B-8bits?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/RichardErkhov/yang-z_-_CodeV-QW-7B-awq?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/mradermacher/CodeV-All-QC-GGUF?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/zhuyaoyu/CodeV-R1-Distill-Qwen-7B?expand[]=downloads&expand[]=downloadsAllTime',
        'https://huggingface.co/api/models/zhuyaoyu/CodeV-R1-Qwen-7B?expand[]=downloads&expand[]=downloadsAllTime'
    ];

    // Format number with comma separators
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Fetch download counts and update display
    async function updateDownloadCount() {
        try {
            let totalDownloads = 0;
            const downloadCountElement = document.getElementById('download-count');
            
            // Show loading state
            if (downloadCountElement) {
                downloadCountElement.textContent = 'Loading...';
            }

            // Fetch data from all URLs
            const promises = downloadUrls.map(url => fetch(url));
            const responses = await Promise.all(promises);
            const jsonData = await Promise.all(responses.map(res => res.json()));

            // Calculate total downloads
            jsonData.forEach(data => {
                if (data.downloadsAllTime !== undefined) {
                    totalDownloads += data.downloadsAllTime;
                }
            });

            // Update display
            if (downloadCountElement) {
                downloadCountElement.textContent = formatNumber(totalDownloads);
            }
        } catch (error) {
            console.error('Error fetching download counts:', error);
            const downloadCountElement = document.getElementById('download-count');
            if (downloadCountElement) {
                downloadCountElement.textContent = 'Error';
            }
        }
    }

    // Initial load
    updateDownloadCount();

    // Refresh every hour (3600000 ms)
    setInterval(updateDownloadCount, 3600000);
});
