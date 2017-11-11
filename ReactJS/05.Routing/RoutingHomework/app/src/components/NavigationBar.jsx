import React from 'react'

const NavigationBar = () => {
    return (
        <div id="menu">
            <div class="title">Navigation</div>
            <a class="nav" href="/">Catalog</a>
            <a class="nav" href="/create">Submit Link</a>
            <a class="nav" href="#">My Posts</a>
        </div>
    )
}

export default NavigationBar