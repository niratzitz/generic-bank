curl -o ui.zip `curl -i -H "Accept: application/octet-stream" -H "Authorization: token $GITHUB_TOKEN" $(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/Tufin/generic-bank/releases/latest | grep url | grep releases\/assets | egrep -o "https://[^\"]+") | grep location: | cut -d " " -f2 | tr -d '\r\n'` && echo 'ignore cache'
unzip ui.zip
