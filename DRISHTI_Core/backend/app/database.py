import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql+asyncpg://drishti:drishti_super_secret@localhost:5432/drishti_db"
)

# Create the async database engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create a session factory
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Base class for our database models
Base = declarative_base()

# Dependency to get the DB session in our FastAPI routes
async def get_db():
    async with SessionLocal() as session:
        yield session
