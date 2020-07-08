#!/bin/sh
set -e

PUSH_INPUT_BRANCH=${PUSH_INPUT_BRANCH}
PUSH_INPUT_FORCE=${PUSH_INPUT_FORCE}
PUSH_INPUT_TAGS=${PUSH_INPUT_TAGS}
PUSH_INPUT_DIRECTORY=${PUSH_INPUT_DIRECTORY}
_FORCE_OPTION=''
REPOSITORY=$GITHUB_REPOSITORY

echo "Push to branch $PUSH_INPUT_BRANCH";
[ -z "${PUSH_INPUT_GITHUB_TOKEN}" ] && {
    echo 'Missing input "github_token: ${{ secrets.GITHUB_TOKEN }}".';
    exit 1;
};

if ${PUSH_INPUT_FORCE}; then
    _FORCE_OPTION='--force'
fi

if ${PUSH_INPUT_TAGS}; then
    _TAGS='--tags'
fi

cd ${PUSH_INPUT_DIRECTORY}

remote_repo="https://${GITHUB_ACTOR}:${PUSH_INPUT_GITHUB_TOKEN}@github.com/${REPOSITORY}.git"

git push "${remote_repo}" HEAD:${PUSH_INPUT_BRANCH} --follow-tags $_FORCE_OPTION $_TAGS;
