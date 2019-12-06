# How to enable PodSecurityPolicies

1. Before enabling PSP, you need to create the policies:  
   kubectl create -f aut/deployment/security/restricted-psp.yaml
2. Enable PSP in your cluster
3. Test:  
   - Delete admin deployment
   - Recreate admin deployment with:
     ```
     securityContext:
       privileged: true
     ```
   - The pod should fail to start 
   - Describe the admin replicaset and you should see:
     "Privileged containers are not allowed"

# Enabling PSP
- GKE: `gcloud beta container clusters update <cluster-name> --enable-pod-security-policy`
