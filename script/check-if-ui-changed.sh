UI_COMMIT=$(git log -1 --format=format:%H --full-diff ng-app)
LAST_COMMIT=$(git rev-parse HEAD)

if [ $UI_COMMIT = $LAST_COMMIT ]; then
    echo "Changes to UI were made"
    $DIR/build-app.sh
else
    echo "NONE"
    $DIR/fetch-release.sh
fi