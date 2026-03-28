package com.rainbowforest.userservice.service;

import com.rainbowforest.userservice.entity.User;
import com.rainbowforest.userservice.entity.UserRole;
import com.rainbowforest.userservice.repository.UserRepository;
import com.rainbowforest.userservice.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.getOne(id);
    }

    @Override
    public User getUserByName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public User saveUser(User user) {
        user.setActive(1);
        if (user.getRole() != null && user.getRole().getId() != null) {
            UserRole existingRole = userRoleRepository.findById(user.getRole().getId()).orElse(null);
            user.setRole(existingRole);
        } else {
            UserRole defaultRole = userRoleRepository.findUserRoleByRoleName("USER");
            user.setRole(defaultRole);
        }
        System.out.println(
                "Role dang luu la: " + (user.getRole() != null ? user.getRole().getRoleName() : "DANG BI NULL ROI!!!"));
        return userRepository.save(user);
    }
}
