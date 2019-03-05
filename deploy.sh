ssh -p 8989 news-engine@news-engine.honzachalupa.cz << EOF
    cd news-engine
    git pull
    npm i
    cd ..
    pm2 restart api
    pm2 logs api
EOF
