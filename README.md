# Before Effects
 
compare before and after VFX + audio

domains
    CompareVFX  diffvfx     beforeFX    beforeafterfx       showcasevfx

npm run build

features
    slider divider
    upload to youtube
    login
    save videos on database         user    date    videos urls     sfx setting

        dont care about time stamp
        max chars tho

        should limit how many you can read also

        get
        list    

        delete      ur id   auth
        update      ur id   auth
        create      ur id   auth
             max nbr? 
                cant query how many? store nbr of videos for each user in a separate docunement?
                cant do it client side, can bypass lol      use google cloud
                make sure consistent using atomic transaction
                email verify    to prevent bots
                gdpr

                create 20 entries for each user, only allow update  - can limit update rate but not create rate


    
    views
        start:          small example         upload          myvideos          constant banner
        my videos:      small list            upload                            constant banner
        1 video:                              upload          my videos         top banner
        all videos for 1 user
        add video

    security
        1 long document per user?
        how create the first one?       use uid is doc id

    client side spam control
        create + update + delete:       20 sec timer        max 20 videos
        read:                           100 per 
        
    info in document
        links       title       SFX setting

    flow
        try get     success --> update          fail --> create