// ============================================
// 3D CHARACTER MODEL (Hooded figure with neon)
// ============================================

function init3DCharacter() {
    const container = document.getElementById('robot-container');
    if (!container || !window.THREE) {
        console.log('Three.js not loaded or container not found');
        return;
    }

    // Remove old robot HTML
    container.innerHTML = '<div id="robot-3d"></div><div id="robot-tooltip">Закажи меня! 🤖</div>';
    
    const canvas = document.createElement('canvas');
    const robotDiv = document.getElementById('robot-3d');
    robotDiv.appendChild(canvas);
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 200/280, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    renderer.setSize(200, 280);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x00ffff, 1.5, 10);
    pointLight1.position.set(2, 2, 3);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 10);
    pointLight2.position.set(-2, 1, 2);
    scene.add(pointLight2);
    
    // Materials
    const whiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.1
    });
    
    const blackMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.8,
        metalness: 0.2
    });
    
    const neonMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.5
    });
    
    // Character group
    const character = new THREE.Group();
    
    // Hood (white)
    const hoodGeometry = new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const hood = new THREE.Mesh(hoodGeometry, whiteMaterial);
    hood.position.y = 1.5;
    hood.castShadow = true;
    character.add(hood);
    
    // Neon crystal on top
    const crystalGeometry = new THREE.ConeGeometry(0.18, 0.35, 4);
    const crystal = new THREE.Mesh(crystalGeometry, neonMaterial);
    crystal.position.y = 2;
    crystal.rotation.y = Math.PI / 4;
    character.add(crystal);
    
    // Face (black)
    const faceGeometry = new THREE.BoxGeometry(0.4, 0.45, 0.1);
    const face = new THREE.Mesh(faceGeometry, blackMaterial);
    face.position.set(0, 1.4, 0.3);
    character.add(face);
    
    // White stripe on face
    const stripeGeometry = new THREE.BoxGeometry(0.35, 0.1, 0.11);
    const stripe = new THREE.Mesh(stripeGeometry, whiteMaterial);
    stripe.position.set(0, 1.4, 0.3);
    character.add(stripe);
    
    // Shoulders
    const shouldersGeometry = new THREE.BoxGeometry(1.1, 0.18, 0.45);
    const shoulders = new THREE.Mesh(shouldersGeometry, whiteMaterial);
    shoulders.position.y = 1.05;
    shoulders.castShadow = true;
    character.add(shoulders);
    
    // Body (white cloak)
    const bodyGeometry = new THREE.BoxGeometry(0.85, 0.95, 0.45);
    const body = new THREE.Mesh(bodyGeometry, whiteMaterial);
    body.position.y = 0.35;
    body.castShadow = true;
    character.add(body);
    
    // Black diagonal stripes on body
    const stripe1Geometry = new THREE.BoxGeometry(0.14, 1, 0.46);
    const stripe1 = new THREE.Mesh(stripe1Geometry, blackMaterial);
    stripe1.position.set(-0.18, 0.35, 0);
    stripe1.rotation.z = -0.2;
    character.add(stripe1);
    
    const stripe2 = new THREE.Mesh(stripe1Geometry, blackMaterial);
    stripe2.position.set(0.18, 0.35, 0);
    stripe2.rotation.z = 0.2;
    character.add(stripe2);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.85, 16);
    
    // Right arm (will raise with sign)
    const rightArm = new THREE.Group();
    const rightArmMesh = new THREE.Mesh(armGeometry, whiteMaterial);
    rightArmMesh.castShadow = true;
    rightArm.add(rightArmMesh);
    
    // Neon stripe on right arm
    const neonStripeGeometry = new THREE.CylinderGeometry(0.13, 0.13, 0.18, 16);
    const rightNeon = new THREE.Mesh(neonStripeGeometry, neonMaterial);
    rightNeon.position.y = 0;
    rightArm.add(rightNeon);
    
    // Hand
    const handGeometry = new THREE.SphereGeometry(0.14, 16, 16);
    const rightHand = new THREE.Mesh(handGeometry, whiteMaterial);
    rightHand.position.y = -0.5;
    rightArm.add(rightHand);
    
    rightArm.position.set(0.6, 0.6, 0);
    rightArm.rotation.z = -0.3;
    character.add(rightArm);
    
    // Left arm
    const leftArm = new THREE.Group();
    const leftArmMesh = new THREE.Mesh(armGeometry, whiteMaterial);
    leftArmMesh.castShadow = true;
    leftArm.add(leftArmMesh);
    
    const leftNeon = new THREE.Mesh(neonStripeGeometry, neonMaterial);
    leftNeon.position.y = 0;
    leftArm.add(leftNeon);
    
    const leftHand = new THREE.Mesh(handGeometry, whiteMaterial);
    leftHand.position.y = -0.5;
    leftArm.add(leftHand);
    
    leftArm.position.set(-0.6, 0.6, 0);
    leftArm.rotation.z = 0.3;
    character.add(leftArm);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.14, 0.14, 0.7, 16);
    
    // Left leg
    const leftLeg = new THREE.Group();
    const leftLegMesh = new THREE.Mesh(legGeometry, whiteMaterial);
    leftLegMesh.castShadow = true;
    leftLeg.add(leftLegMesh);
    
    const leftLegNeon = new THREE.Mesh(neonStripeGeometry, neonMaterial);
    leftLegNeon.position.y = 0;
    leftLeg.add(leftLegNeon);
    
    const leftFoot = new THREE.Mesh(handGeometry, whiteMaterial);
    leftFoot.position.y = -0.4;
    leftFoot.scale.set(1, 0.6, 1);
    leftLeg.add(leftFoot);
    
    leftLeg.position.set(-0.25, -0.5, 0);
    character.add(leftLeg);
    
    // Right leg
    const rightLeg = new THREE.Group();
    const rightLegMesh = new THREE.Mesh(legGeometry, whiteMaterial);
    rightLegMesh.castShadow = true;
    rightLeg.add(rightLegMesh);
    
    const rightLegNeon = new THREE.Mesh(neonStripeGeometry, neonMaterial);
    rightLegNeon.position.y = 0;
    rightLeg.add(rightLegNeon);
    
    const rightFoot = new THREE.Mesh(handGeometry, whiteMaterial);
    rightFoot.position.y = -0.4;
    rightFoot.scale.set(1, 0.6, 1);
    rightLeg.add(rightFoot);
    
    rightLeg.position.set(0.25, -0.5, 0);
    character.add(rightLeg);
    
    scene.add(character);
    
    // Animation
    let time = 0;
    let lastScrollY = window.pageYOffset;
    let scrollVelocity = 0;
    let showSign = false;
    let signTimer = 0;
    
    // Scroll detection
    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;
        scrollVelocity = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
        
        // Show sign when scrolling
        if (scrollVelocity > 5) {
            showSign = true;
            signTimer = 0;
            container.classList.add('show-tooltip');
        }
    });
    
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.01;
        signTimer += 0.016;
        
        // Hide sign after 3 seconds
        if (signTimer > 3 && showSign) {
            showSign = false;
            container.classList.remove('show-tooltip');
        }
        
        // Idle animation
        character.rotation.y = Math.sin(time * 0.5) * 0.08;
        character.position.y = Math.sin(time) * 0.04;
        
        // Crystal glow
        crystal.rotation.y += 0.02;
        neonMaterial.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.3;
        
        // Right arm raises when showing sign
        if (showSign) {
            rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -1.8, 0.1);
            rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, 0.3, 0.1);
        } else {
            rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -0.3, 0.05);
            rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, 0, 0.05);
        }
        
        // Left arm idle wave
        leftArm.rotation.z = 0.3 + Math.sin(time * 2) * 0.1;
        
        // Scale on hover
        const targetScale = container.matches(':hover') ? 1.05 : 1;
        character.scale.setScalar(THREE.MathUtils.lerp(character.scale.x, targetScale, 0.1));
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    console.log('3D Character loaded with scroll animation!');
}
