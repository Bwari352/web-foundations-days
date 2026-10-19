1. Assumptions

The following assumptions are used to estimate SnapShare's workload:

SnapShare has 10 million registered users.

10% of registered users are active each day.

Each daily active user uploads one photo per day.

Each daily active user views 50 feed pages per day.

Each original photo has an average size of 2 MB.

Each photo generates one thumbnail of 50 KB.

One day has 86,400 seconds, and one year has 365 days.

All daily active users perform the stated activities every day.

Storage estimates use decimal units, where 1 TB = 1,000 GB.

Traffic is averaged across 24 hours; actual peak traffic may be higher.

Photos and thumbnails are retained for at least one year.

2. Workload and Storage Estimates

Daily active users

Daily active users = Registered users × Daily activity rate

= 10,000,000 × 0.10

= 1,000,000 active users per day

Photo uploads per second

Daily uploads = 1,000,000 × 1

= 1,000,000 photos per day

Average uploads per second = 1,000,000 ÷ 86,400

= 11.6 uploads per second

Feed views per second

Daily feed views = 1,000,000 × 50

= 50,000,000 feed page views per day

Average feed views per second = 50,000,000 ÷ 86,400

= 578.7 feed page views per second

Storage per year

Original photo storage per day:

1,000,000 × 2 MB = 2,000,000 MB = 2,000 GB

Original photo storage per year:

2,000 GB × 365 = 730,000 GB = 730 TB

Thumbnail storage per day:

1,000,000 × 50 KB = 50,000,000 KB = 50 GB

Thumbnail storage per year:

50 GB × 365 = 18.25 TB

Total storage per year:

730 TB + 18.25 TB = 748.25 TB per year

3. Read-Heavy or Write-Heavy?

SnapShare is a read-heavy system because users generate approximately 50 million feed page views per day but only 1 million photo uploads per day. This means feed views occur 50 times as often as photo uploads. The architecture should therefore optimize reading through caching, a CDN and database read replicas while still supporting reliable photo uploads.

4. Explain why photos should not be stored in the database
Photos should be stored in object storage, such as Amazon S3 or Google Cloud Storage, rather than directly inside the database. Because large image files consume database storage, increase backup sizes and can make database operations less efficient. The database should store metadata such as the photo ID, owner, caption, upload time and object-storage URL.

5. Architecture Diagram
 
                     USERS
                       |
              +------------------+
              |       CDN        |
              +------------------+
                       |
              +------------------+
              |  Load Balancer   |
              +------------------+
                       |
              +------------------+
              |   App Servers    |
              +------------------+
                 |      |      |
                 |      |      +------------------+
                 |      |                         |
                 v      v                         v
            +--------+  +----------------+  +------------------+
            | Cache  |  | Primary        |  | Object Storage   |
            |        |  | Database       |  | Original Photos  |
            +--------+  +----------------+  | and Thumbnails   |
                              |             +------------------+
                              v
                        +-------------+
                        | Read Replica|
                        +-------------+

                 THUMBNAIL PROCESSING

                   App Servers
                       |
                       v
                  +----------+
                  |  Queue   |
                  +----------+
                       |
                       v
                  +----------+
                  | Thumbnail|
                  |  Worker  |
                  +----------+
                       |
                       v
                  +------------------+
                  | Object Storage   |
                  +------------------+
6. Components and the Problems They Solve

CDN: Delivers photos and thumbnails from servers closer to users, reducing loading time and traffic to the application.

Load balancer: Distributes incoming requests across multiple app servers to prevent any single server from becoming overloaded.

App servers: Process user requests, authenticate users, validate uploads and generate feed responses.

Cache: Keeps frequently requested feed data and metadata in memory to reduce repeated database queries.

Primary database: Stores and manages structured information such as user accounts, follower relationships, captions and photo metadata.

Read replica: Handles database read queries separately from the primary database, reducing the primary database's workload.

Object storage: Stores original photo files and thumbnails efficiently without filling the database with large binary files.

Queue: Holds thumbnail-generation jobs so that photo uploads do not have to wait for image processing to finish.

Thumbnail worker: Processes queued jobs in the background, creates smaller image versions, and saves them to object storage.

7. Step-by-Step Photo Upload Flow

A user selects a photo and submits it to SnapShare.

The load balancer forwards the request to an available app server.

The app server authenticates the user and validates the photo's file type and size.

The app server stores the original photo in object storage.

The app server saves the photo metadata and storage reference in the primary database.

The app server places a thumbnail-generation job in the queue.

The application confirms the upload to the user without waiting for thumbnail processing to finish.

A thumbnail worker retrieves the job from the queue and generates a 50 KB thumbnail.

The worker stores the thumbnail in object storage and updates the photo's processing status in the database.

When users view their feeds, the CDN delivers cached images, the cache supplies frequently requested feed data and the read replica handles suitable database queries.

8. Trade-Offs

Trade-off 1: Caching versus data freshness

Caching makes feed loading faster and reduces database load, but users may temporarily see outdated feed information. Cache expiration and invalidation help maintain freshness but add complexity.

Trade-off 2: Asynchronous processing versus immediate availability

A queue allows uploads to complete without waiting for thumbnail generation, improving the upload experience. However, thumbnails may not be immediately available and the system must handle failed jobs and retries.

Trade-off 3: Read replicas versus consistency

Read replicas improve read performance, but replication delays may cause newly uploaded photos to be temporarily missing from feeds. Reading critical recent updates from the primary database can reduce this problem.

Trade-off 4: CDN performance versus cost

A CDN reduces loading times and origin-server traffic, but it adds service costs and requires correct cache configuration to prevent unauthorized access to private photos.