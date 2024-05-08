const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "mrpalindrome") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                    coverImage
                }
            }
        }
    }
`;

async function gql(query, variables={}) {
    const data = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}
let count = 0
gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        
        const articles = result.data.user.publication.posts;
        let container = document.createElement('div');
        container.classList.add('blog-div');

        articles.every(article => {
            let parentcontainer = document.createElement('div');
            parentcontainer.classList.add("parent-row","projects-area");

            let childcontainer = document.createElement('div');
            childcontainer.classList.add("child-row");
            let contentcontainer = document.createElement('div');
            contentcontainer.classList.add("content-row");


            let covImg = document.createElement('img');
            covImg.src = article.coverImage;
            covImg.classList.add('blog-img');
            // covImg.classList.add('col-lg-6 col-md-12 site-title');
            // covImg.classList.add('col-lg-6', 'col-md-12' ,'banner-image');
            
            let title = document.createElement('h2');
            title.innerText = article.title;
            title.classList.add('blog-title');
            // title.classList.add('col-lg-6 col-md-12 site-title');
            // title.classList.add('col-lg-6', 'col-md-12' );
            
            let brief = document.createElement('p');
            brief.innerText = article.brief;
            brief.classList.add('blog-brief');
            // brief.classList.add('col-lg-6', 'col-md-12');
            
            
            let parentLink = document.createElement('a');
            parentLink.href = `https://blog.nayandas.dev/${article.slug}`;
            parentLink.target='_blank';
            parentLink.classList.add('link')
            
            let link = document.createElement('a');
            link.href = `https://blog.nayandas.dev/${article.slug}`;
            link.target='_blank';
            link.classList.add('blog-link');
            link.innerText = 'Read more';
            
            container.appendChild(parentLink);
            parentLink.appendChild(parentcontainer)
            parentcontainer.appendChild(childcontainer);
            childcontainer.appendChild(covImg);
            childcontainer.appendChild(contentcontainer);
            contentcontainer.appendChild(title);
            contentcontainer.appendChild(brief);
            contentcontainer.appendChild(link);
            count=count+1
            console.log('count',count)
            if (count==3){
                return false;
            }
            return true;
        })
        
        document.querySelector('.app').appendChild(container);
});