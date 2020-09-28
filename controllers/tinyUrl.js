const shortCode = require("shortid");
const validUrl = require('valid-url');
const cache = require("../service/cache");
const model = require('../model/model')
const tinyUrl = model({
  name: 'tinyUrl',
  tableName: 'tinyurl'
})
const handleUrlRedirect = async (req, res, db) => {
  const urlCode = req.params.url;
  const _urlData = await tinyUrl.find(['url_code', '=', urlCode])
  if (_urlData[0]) {
    return res.redirect(_urlData[0].original_url);
  } else {
    // TODO: add error page
    return res.redirect('');
  }
};

const handleUrlShorten = async (req, res, db) => {
    const { shortBaseUrl, originalUrl } = req.body;
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res.status(404).json('INVALID_BASE_URL_FORMAT');
    }
    const updatedAt = new Date();
    const queryOptions = { originalUrl };

    if (validUrl.isUri(originalUrl)) {
      let urlData;
      try {
        // Find item in the cache
        urlData = await cache.getFromCache('originalUrl', JSON.stringify(queryOptions));

        // Find item in the db
        if(!urlData) {
          const _urlData = await tinyUrl.find(['original_url', '=', queryOptions])
          urlData = _urlData[0]
        }

        if (urlData) {
          res.status(200).json(urlData)
        } else {
          const urlCode = shortCode.generate();
          shortUrl = shortBaseUrl + '/' + urlCode;
          const itemToBeSaved = { originalUrl, shortUrl, urlCode, updatedAt };
          const insertContent = {
            original_url: originalUrl,
            url_code: urlCode, 
            short_url: shortUrl,
            created_at: new Date(),
            updated_at: new Date()
        }
          // // Add to db
          tinyUrl.createTransaction(trx => {
            trx.insert(insertContent)
            .into('tinyurl')
            .then(trx.commit)
            .catch(trx.rollback)
          })
          .catch(err => res.status(400).json('UNABLE_TO_GEN'));

          // Add to cache
          cache.addToCache('originalUrl', JSON.stringify(queryOptions), itemToBeSaved);
          res.status(200).json(itemToBeSaved);
        }

      }catch(err){
        res.status(401).json('INVALID_USER_ID')
      }
    }else{
      res.status(401).json('INVALID_ORIGINAL_URL')
    }
}

module.exports = {
    handleUrlShorten: handleUrlShorten,
    handleUrlRedirect: handleUrlRedirect
};
  