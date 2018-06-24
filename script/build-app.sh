cd ng-app/generic-bank
npm install
ng build --prod --buildOptimizer --aot

sudo cp -vr dist $CIRCLE_ARTIFACTS/
sudo zip -r ui.zip dist
sudo $DIR/github-release.sh github_api_token=$GITHUB_TOKEN owner=$CIRCLE_PROJECT_USERNAME repo=$CIRCLE_PROJECT_REPONAME tag=v0.0.$CIRCLE_BUILD_NUM filename=ui.zip branch=$CIRCLE_BRANCH