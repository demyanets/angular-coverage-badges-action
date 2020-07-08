#!/bin/sh
set -e

PUSH_INPUT_BRANCH=${PUSH_INPUT_BRANCH}
PUSH_INPUT_DIRECTORY=${PUSH_INPUT_DIRECTORY}
REPOSITORY=$GITHUB_REPOSITORY

echo "Push to branch $PUSH_INPUT_BRANCH";
[ -z "${INPUT_GITHUB-TOKEN}" ] && {
    echo 'Missing input "github_token: ${{ secrets.GITHUB_TOKEN }}".';
    exit 1;
};

cd ${PUSH_INPUT_DIRECTORY}

remote_repo="https://${GITHUB_ACTOR}:${INPUT_GITHUB-TOKEN}@github.com/${REPOSITORY}.git"

git push "${remote_repo}" HEAD:${PUSH_INPUT_BRANCH} --follow-tags $_FORCE_OPTION $_TAGS;
