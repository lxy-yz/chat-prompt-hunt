// https://giscus.app/
// <script src="https://giscus.app/client.js"
//         data-repo="lxy-yz/chat-prompt-hunt"
//         data-repo-id="R_kgDOJwDyIw"
//         data-category="General"
//         data-category-id="DIC_kwDOJwDyI84CXSpZ"
//         data-mapping="pathname"
//         data-strict="0"
//         data-reactions-enabled="1"
//         data-emit-metadata="0"
//         data-input-position="bottom"
//         data-theme="preferred_color_scheme"
//         data-lang="en"
//         crossorigin="anonymous"
//         async>
// </script>

'use client'

import Giscus from '@giscus/react';

export const Comments = () => {
  // TODO: customize
  // https://github.com/giscus/giscus-component#changing-the-iframe-styles
  return (
    <Giscus
      id="comments"
      repo="lxy-yz/chat-prompt-hunt"
      repoId="R_kgDOJwDyIw"
      category="General"
      categoryId="DIC_kwDOJwDyI84CXSpZ"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
};
