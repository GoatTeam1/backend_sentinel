import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Limpiar datos existentes (opcional)
    await prisma.attack.deleteMany();
    await prisma.loginAttemp.deleteMany();
    await prisma.ipInfo.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Cleared existing data');

    // Seed Users (50)
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = [];
    for (let i = 1; i <= 50; i++) {
        users.push({
            username: `user${i}`,
            email: `user${i}@example.com`,
            password: hashedPassword,
        });
    }
    await prisma.user.createMany({ data: users });
    console.log('✅ Created 50 users');

    // Seed IpInfo (50)
    const ipInfos = [];
    const countries = ['USA', 'Mexico', 'Canada', 'Brazil', 'Argentina', 'Spain', 'France', 'Germany', 'UK', 'Japan'];
    const cities = ['New York', 'CDMX', 'Toronto', 'Sao Paulo', 'Buenos Aires', 'Madrid', 'Paris', 'Berlin', 'London', 'Tokyo'];

    for (let i = 1; i <= 50; i++) {
        ipInfos.push({
            ip: `192.168.${Math.floor(i / 256)}.${i % 256}`,
            lastActivity: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // últimos 30 días
            geolocation: {
                country: countries[i % countries.length],
                city: cities[i % cities.length],
            },
        });
    }
    await prisma.ipInfo.createMany({ data: ipInfos });
    console.log('✅ Created 50 IP info records');

    // Seed LoginAttempts (50)
    const loginAttempts = [];
    for (let i = 1; i <= 50; i++) {
        loginAttempts.push({
            username: `attacker${i}`,
            password: `fake_password_${i}`,
            timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // últimos 7 días
        });
    }
    await prisma.loginAttemp.createMany({ data: loginAttempts });
    console.log('✅ Created 50 login attempts');

    // Seed Attacks (50)
    const attacks = [];
    const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'SSH', 'FTP'];
    const oses = ['Linux', 'Windows', 'MacOS', 'Android', 'iOS', 'Unknown'];
    const behaviors = ['Port Scan', 'Brute Force', 'SQL Injection', 'XSS', 'DDoS', 'Malware'];

    for (let i = 1; i <= 50; i++) {
        attacks.push({
            ip: `10.0.${Math.floor(i / 256)}.${i % 256}`,
            port: 1000 + Math.floor(Math.random() * 64000),
            protocol: protocols[i % protocols.length],
            os: oses[i % oses.length],
            timestamp: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000), // últimos 15 días
            payload: `attack_payload_${i}_${Math.random().toString(36).substring(7)}`,
            tools: {
                scanner: i % 2 === 0 ? 'nmap' : 'masscan',
                exploits: [`exploit_${i % 5}`, `cve-2024-${1000 + i}`],
            },
            behavior: behaviors[i % behaviors.length],
            geolocation: {
                country: countries[i % countries.length],
                city: cities[i % cities.length],
            },
        });
    }
    await prisma.attack.createMany({ data: attacks });
    console.log('✅ Created 50 attacks');

    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
