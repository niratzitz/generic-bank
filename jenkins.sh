set +x

github_token=
docker_user=
docker_pass=

image_name=tufinim/generic-bank
gopath=/var/jenkins_home/tools/org.jenkinsci.plugins.golang.GolangInstallation/1.10.3
srcpath=$gopath/src/github.com/tufin/generic-bank

# build generic-bank code
rm -rf $srcpath
cp -r . $srcpath
cd $srcpath
go get
go build -o .dist/generic-bank
go test

# get ui
curl -o ui.zip `curl -i -H "Accept: application/octet-stream" -H "Authorization: token $github_token" $(curl -s -H "Authorization: token $github_token" https://api.github.com/repos/Tufin/generic-bank-ui/releases/latest | grep url | grep releases\/assets | egrep -o "https://[^\"]+") | grep location: | cut -d " " -f2 | tr -d '\r\n'` && echo 'ignore cache'
unzip ui.zip -d ./ui

# create docker image and docker-hub deploy
docker build -t $image_name .

docker tag $image_name $image_name:$BUILD_NUMBER
echo "$docker_pass" | docker login -u $docker_user --password-stdin
docker push $image_name
